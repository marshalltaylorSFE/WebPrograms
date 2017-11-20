
/* v0.2
* Changed pin assignments to match the ESP-WROOM-32 module, and added
* a seprate column to display the temperature in Fahrenheit as well.
* 
* v0.1
* Example code for the Q-Blocks Phase 1. This example sketch reads
* sensor data from the QWIIC Environmental Combo sensor and logs the
* data to a SD card in .csv format.
* 
* The following libraries are not default Arduino Libraries and will
* need to be downloaded separately and stored in your library manager.
* On Windows this is typically under Documents/Arduino/Libraries.
* 
* CCS811 - https://github.com/sparkfun/SparkFun_CCS811_Arduino_Library/archive/master.zip
* BME280 - https://github.com/sparkfun/SparkFun_BME280_Arduino_Library/archive/master.zip
*/
#include <string>
//#include <stdint.h> //
#include "SPI.h"              //Arduino SPI Library for SD Card
#include <Wire.h>             //I2C Library
#include "SD.h"               //SD Card Library
#include <WiFiClient.h>
#include <ESPWebServer.h>
#include <ESPmDNS.h>
#include "DirectoryServer.h"
#include "q-blocks-hardware.h"
#include "WebInterface.h"

#include "SparkFunCCS811.h"   //Library for CCS811
#include "SparkFunBME280.h"   //BME280 Library


#define CCS811_ADDR     0x5B  // Default I2C address for CCS811
#define BME280_ADDR     0x77  // Default I2C address for BME280

//CCS811 myCCS811(CCS811_ADDR);
//BME280 myBME280;

//unsigned long loop_count=0; //Used currently for the timestamp
//volatile bool logData;      // 0-Not logging, 1-logging data
//bool sensorOK;              // 0-Sensor not detected, 1-Sensor OK
//volatile bool cardOK;
//bool reinitialize;          // Reinitalize I2C sensors if sensor lost power

//volatile byte timerCount;
hw_timer_t * timer = NULL;

//const char* ssid     = "Shaggy";
//const char* password = "downinglife";
const char* ssid     = "sparkfun-guest";
const char* password = "sparkfun6333";

QHardware qHardware;
QStatus qStatus;
QCommand qCommand;

FileServer server(80);

volatile long int stateTick = 0;
//void handleClear() {
//	server.send(200, "text/plain", "Data cleared.");
//    Serial.printf("Deleting file: %s\n", "/datalog.csv");
//    if(SD.remove("/datalog.csv")){
//        Serial.println("File deleted");
//    } else {
//        Serial.println("Delete failed");
//    }
//}
//
//void handleStart() {
//	server.send(200, "text/plain", "Started.");
//    Serial.printf("HTTP Request to start");
//	logData = 1;
//}
//
//void handleStop() {
//	server.send(200, "text/plain", "Stopped.");
//    Serial.printf("HTTP Request to stop");
//	logData = 0;
//}

void IRAM_ATTR onTimer(void)
{
	qHardware.nextTick += 5;
	stateTick += 5;
}

void handleCommand() {
	if (server.hasArg("plain")== false){ //Check if body received
		Serial.printf("Command body not received\n");
		server.send(200, "text/plain", "Body not received\n");
		return;

	}
	server.send(200, "text/plain", "Body received!\n");
	qCommand.jsonStr = server.arg("plain");
	qCommand.parseJsonStr();
    Serial.printf("Command received: %d\n", qCommand.command);
}

void handleStatus() {
	qStatus.buildJsonStr();
	server.send(200, "text/json", qStatus.jsonStr.c_str());
    Serial.printf("Status requested.\n");
	stateTick = 0;
	qHardware.setLeds(green);
}

void setup() {
	//Initialize LEDs and Pushbutton
	//  pinMode(LOG_SWITCH_PIN,INPUT_PULLUP);
	//  pinMode(SD_INSERTED_PIN,INPUT_PULLUP);
	qHardware.init();
	qHardware.setLeds( red );

	Wire.begin();       //Start I2C bus
	Serial.begin(115200); //Start Serial debug
	Serial.println(".");
	delay(6000);
	Serial.println("program entry");

	//  attachInterrupt(digitalPinToInterrupt(LOG_SWITCH_PIN),switchISR,FALLING);
	//  attachInterrupt(digitalPinToInterrupt(SD_INSERTED_PIN),sdCardISR,CHANGE);

	timer = timerBegin(0, 80, true);
	timerAttachInterrupt(timer, &onTimer, true);
	timerAlarmWrite(timer, 5000, true);
	timerAlarmEnable(timer);

	//  initializeI2C();
	qStatus.buildJsonStr();
	Serial.println(qStatus.jsonStr.c_str());
	qCommand.parseJsonStr();
	Serial.println(qCommand.command);
	//Mount the SD card
	if(server.mountCard()==-1)
		{
			Serial.println("Holding program");
			while(1);
		}
	server.setCardRoot("/dist");
	server.setHTTPRoot("");

	WiFi.begin(ssid, password);
		//  Serial.println("Show mac address");
		//	Serial.print(WiFi.macAddress());
	// Wait for connection
	while (WiFi.status() != WL_CONNECTED) {
		delay(500);
		Serial.print(".");
	}
	Serial.println("");
	Serial.print("Connected to ");
	Serial.println(ssid);
	Serial.print("IP address: ");
	Serial.println(WiFi.localIP());
	
	if (MDNS.begin("esp")) {
		Serial.println("MDNS responder started");
	}
	server.serveStatic("/datalog.csv", SD, "/datalog.csv", "no-cache, no-store, must-revalidate");
	server.on("/dev/status", handleStatus);
	server.on("/dev/command", handleCommand);
	//server.on("/dev/stop", handleStop);
		
	server.startServer();
	qHardware.setLeds( yellow );
}

void loop() {
	server.handleClient();
	qHardware.tick();
	if(stateTick > 15000)
	{
		qHardware.setLeds(yellow);
	}
	
	//	if(logData){
	//	checkCard();
	//	checkI2C();
	//	
	//	if(sensorOK && cardOK && logData) //If sensor and SD card reads OK and user has pushed start log button, log the data!
	//	{
	//		digitalWrite(ERROR_LED,LOW);        //Turn error LED Off
	//		digitalWrite(LOG_STATUS_LED,HIGH);  //Turn log LED On
	//		
	//		//Reintialize I2C bus if needed
	//		if(reinitialize)
	//		{
	//		initializeI2C();
	//		}
	//	
	//		//Average 16 samples of temperature and humidity together by averageing out the noise
	//		float temperature=0, humidity=0;
	//		for(byte i=0;i<16;i++)
	//		{
	//		temperature += myBME280.readTempC();
	//		humidity += myBME280.readFloatHumidity();
	//		}
	//	
	//		temperature /= 16.0;
	//		humidity /= 16.0;
	//	
	//		
	//	
	//		File dataFile = SD.open("/datalog.csv",FILE_APPEND);
	//	
	//		if(dataFile)
	//		{
	//		//Average 16 samples of pressure,altitude,CO2, and TVOC data together by averaging out the noise
	//		float myPressure=0,myAltitude=0;
	//		unsigned long myCO2=0,myTVOC=0;
	//		for(byte i=0;i<16;i++)
	//		{
	//			myPressure += myBME280.readFloatPressure();
	//			myAltitude += myBME280.readFloatAltitudeMeters();
	//			myCCS811.readAlgorithmResults();
	//			myCO2 += myCCS811.getCO2();
	//			myTVOC += myCCS811.getTVOC();
	//			
	//		}
	//		myPressure /= 16.0;
	//		myAltitude /= 16.0;
	//		myCO2 /= 16;
	//		myTVOC /= 16;
	//	
	//		//Write to SD Card
	//		//Write the time stamp
	//		dataFile.print(loop_count);
	//		dataFile.print(',');
	//		
	//		//Write BME280 Data
	//		dataFile.print(temperature,2);
	//		dataFile.print(',');
	//		dataFile.print((temperature*9.0/5.0)+32,2);
	//		dataFile.print(',');
	//		dataFile.print(humidity,2);
	//		dataFile.print(',');
	//		dataFile.print(myPressure, 2);
	//		dataFile.print(',');
	//		dataFile.print(myAltitude, 2);
	//		dataFile.print(',');
	//		
	//		//Write CCS811 Data
	//		dataFile.print(myCO2);
	//		dataFile.print(',');
	//		dataFile.println(myTVOC);
	//		dataFile.close(); 
	//		Serial.println("File updated");      
	//		}
	//		else
	//		{
	//		//Throw Error
	//		Serial.println("Unable to write to SD card");
	//		}
	//		
	//		digitalWrite(LOG_STATUS_LED,LOW); //Turn LED off to show data has been written
	//	
	//		//Sample rate
	//		//Uses a smart delay. If the user wishes to stop logging data, they don't have to
	//		//wait for the delay to end before turning off the log status LED.
	//		int counter = 0;
	//		while(counter < 1000)
	//		{
	//		if(counter > 100) //After 100ms, turn the LED back On
	//		{
	//			digitalWrite(LOG_STATUS_LED,HIGH);
	//		}
	//		if(logData == 0)  //User has pushed the button to stop logging
	//		{
	//			digitalWrite(LOG_STATUS_LED,LOW);
	//			break;
	//		}
	//		delay(1);
	//		counter++;
	//		}
	//		loop_count++; //Update time stamp variable
	//	}
	//	else if(sensorOK && cardOK && !logData)
	//	{
	//		digitalWrite(LOG_STATUS_LED,LOW);
	//		digitalWrite(ERROR_LED,HIGH);
	//	}
	//	else
	//	{
	//		digitalWrite(LOG_STATUS_LED,LOW);
	//	}
	//	}
}

//void checkCard(void)
//{
//  cardOK = !digitalRead(SD_INSERTED_PIN);
//  
//  if(cardOK)
//  {
////    SD.begin(chipSelect);
//  
//    File dataFile = SD.open("/datalog.csv");
//    
//    if(dataFile.size() == 0)
//    {
//      File dataFile = SD.open("/datalog.csv",FILE_WRITE);
//      dataFile.println("Time (s),Temp (C),Temp (F),Humidity (%),Pressure (Pa),Altitude (m),CO2 (ppm),TVOC (ppb)");
//      dataFile.close();
//      Serial.println("Header Written");
//    }
//  }
//  else
//  {
//    logData = 0;
//  }
//}

//void checkI2C(void)
//{
//  byte error, address,deviceID[2],errorID[2],j;
//  int nDevices;
//  
//  // Scan I2C Addresses
//  nDevices = 0;
//  for(byte i=1;i< 127;i++)
//  {
//    Wire.beginTransmission(i);
//    error = Wire.endTransmission();
// 
//    if (error == 0)
//    {
//      deviceID[nDevices] = i;
//      nDevices++;
//    }
//    else if (error==4)
//    {
//      errorID[j] = i;
//      j++;
//    }
//  }
//
//  //Check for I2C Error
//  if (nDevices == 0)  //No I2C device detected, throw error
//  { 
//    reinitialize = 1; //Reinitialize I2C bus when sensor is reconnected
//    if(sensorOK)  //Print error to serial debug
//    {
//      Serial.println("Sensor(s) not found. Check to make sure Qwiic board is connected");
//      logData = 0;
//    }
//    sensorOK = 0;
//  }
//  else  //Clear error
//  {
//    sensorOK = 1;
//  }
//}

//void initializeI2C(void)
//{
//  CCS811Core::status returnCode = myCCS811.begin();
//
//  //Initialize BME280
//  myBME280.settings.commInterface = I2C_MODE;
//  myBME280.settings.I2CAddress = BME280_ADDR;
//  myBME280.settings.runMode = 3; //Normal mode
//  myBME280.settings.tStandby = 0;
//  myBME280.settings.filter = 0;
//  myBME280.settings.tempOverSample = 1;
//  myBME280.settings.pressOverSample = 1;
//  myBME280.settings.humidOverSample = 1;
//  delay(10);
//  
//  myBME280.begin();
//  
//  float temperature, humidity;
//
//  for(byte i=0;i<16;i++)
//  {
//    temperature += myBME280.readTempC();
//    humidity += myBME280.readFloatHumidity();
//  }
//  myCCS811.begin();
//  myCCS811.setEnvironmentalData(humidity/16.0, temperature/16.0);
//  
//  reinitialize = 0;
//}

//void switchISR(void)  //Interrupt routine if button has been pressed with software debounce
//{
//  static unsigned long last_interrupt_time = 0;
//  unsigned long interrupt_time = millis();
//  // If interrupts come faster than 200ms, assume it's a bounce and ignore
//  if (interrupt_time - last_interrupt_time > 350) 
//  {
//    if(sensorOK && cardOK)logData = !logData;
//  }
//  last_interrupt_time = interrupt_time;
//}

//void sdCardISR(void)
//{
//  static unsigned long last_interrupt_time = 0;
//  unsigned long interrupt_time = millis();
//  // If interrupts come faster than 200ms, assume it's a bounce and ignore
//  if (interrupt_time - last_interrupt_time > 350) 
//  {
////    cardOK = !digitalRead(SD_INSERTED_PIN);
////    if(cardOK)
////    {
////      SD.begin(chipSelect);
////    }
////    else
////    {
////      logData = 0;
////    }
//  }
//  last_interrupt_time = interrupt_time;
//}
