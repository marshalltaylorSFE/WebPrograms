
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
#include "SensorBME280.h"
#include "Sensors.h"

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
QSensors qSensors;

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
	
//	SensorInterface * thing;
//
//	thing = new QSensorBME280;
//	thing->isGood();
//	QSensorBME280 * thing = new QSensorBME280;
//	
	qSensors.sensorVector.push_back( new QSensorBME280 );
	Serial.println(qSensors.sensorVector[0]->isGood());
	qSensors.sensorVector[0]->parseJsonStr();
	qSensors.sensorVector[0]->initialize();
	
//	qSensors.sensorVector.push_back( thing );
//	Serial.println( qSensors.sensorVector.size());
//	SensorInterface * target = qSensors.sensorVector[0];
//	target->isGood();
//	qHardware.setLeds( yellow );
}

void loop() {
	Serial.println("loop");
//	server.handleClient();
	qHardware.tick();
	if(stateTick > 15000)
	{
		qHardware.setLeds(yellow);
	}
	delay(1000);
	String _str;
	_str = "";
	qSensors.sensorVector[0]->getHeader(&_str);
	Serial.println(_str);
	_str = "";
	qSensors.sensorVector[0]->getData(&_str);
	Serial.println(_str);
	

}
