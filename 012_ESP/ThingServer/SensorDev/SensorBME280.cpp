#include "SparkFunBME280.h"   //BME280 Library
#include "SensorBME280.h"
#define BME280_ADDR     0x77  // Default I2C address for BME280

QSensorBME280::QSensorBME280(){
	jsonStr = "{\"name\":\"BME280\",\"celsiusEnabled\":true,\"fahrenheitEnabled\":false,\"pressureEnabled\":false,\"humidityEnabled\":true}";
}

void QSensorBME280::initialize(){
  //Initialize BME280
  sensor.settings.commInterface = I2C_MODE;
  sensor.settings.I2CAddress = BME280_ADDR;
  sensor.settings.runMode = 3; //Normal mode
  sensor.settings.tStandby = 0;
  sensor.settings.filter = 0;
  sensor.settings.tempOverSample = 1;
  sensor.settings.pressOverSample = 1;
  sensor.settings.humidOverSample = 1;
  sensor.begin();
  	
}

bool QSensorBME280::isGood(){
    uint8_t tempReadData = sensor.readRegister(0xD0);
	Serial.println(tempReadData, HEX);
	if( tempReadData == 0x60 ){
		return true;
	}else{
		return false;
	}
}

void QSensorBME280::buildJsonStr( void ){
	jsonStr = "";
	jsonStr += "{\"name\":\"BME280\",\"celsiusEnabled\":";
	if(celsiusEnabled){jsonStr += "true";}else{jsonStr += "false";}
	jsonStr += ",\"fahrenheitEnabled\":";
	if(fahrenheitEnabled){jsonStr += "true";}else{jsonStr += "false";}
	jsonStr += ",\"pressureEnabled\":";
	if(pressureEnabled){jsonStr += "true";}else{jsonStr += "false";}
	jsonStr += ",\"humidityEnabled\":";
	if(humidityEnabled){jsonStr += "true";}else{jsonStr += "false";}
	jsonStr += "}";	
}

void QSensorBME280::parseJsonStr( void ){
	int index1;
	int index2;
	jsonStr.replace(" ", "");
	jsonStr.replace("\t", "");
	jsonStr.replace("\n", "");
	jsonStr.replace("\r", "");
	index1 = jsonStr.indexOf("celsiusEnabled\":") + 16;
	if( jsonStr.substring(index1, index1+4 ) ==  "true") celsiusEnabled = true;
	if( jsonStr.substring(index1, index1+5 ) == "false") celsiusEnabled = false;
	index1 = jsonStr.indexOf("fahrenheitEnabled\":") + 19;
	if( jsonStr.substring(index1, index1+4 ) ==  "true") fahrenheitEnabled = true;
	if( jsonStr.substring(index1, index1+5 ) == "false") fahrenheitEnabled = false;
	index1 = jsonStr.indexOf("pressureEnabled\":") + 17;
	if( jsonStr.substring(index1, index1+4 ) ==  "true") pressureEnabled = true;
	if( jsonStr.substring(index1, index1+5 ) == "false") pressureEnabled = false;
	index1 = jsonStr.indexOf("humidityEnabled\":") + 17;
	if( jsonStr.substring(index1, index1+4 ) ==  "true") humidityEnabled = true;
	if( jsonStr.substring(index1, index1+5 ) == "false") humidityEnabled = false;
	Serial.println(celsiusEnabled);
	Serial.println(fahrenheitEnabled);
	Serial.println(pressureEnabled);
	Serial.println(humidityEnabled);
}

void QSensorBME280::getHeader( String * _header ){
	if( celsiusEnabled ) *_header += ",Temp(C)";
	if( fahrenheitEnabled ) *_header += ",Temp(F)";
	if( pressureEnabled ) *_header += ",Pressure(kPa)";
	if( humidityEnabled ) *_header += ",Humidity(%)";
}

void QSensorBME280::getData( String * _header ){
	char buffer[40];
	if( celsiusEnabled ){
		sprintf(buffer, ",%f", sensor.readTempC());
		*_header += buffer;
	};
	if( fahrenheitEnabled ){
		sprintf(buffer, ",%f", sensor.readTempF());
		*_header += buffer;
	};
	if( pressureEnabled ){
		sprintf(buffer, ",%f", sensor.readFloatPressure());
		*_header += buffer;
	};
	if( humidityEnabled ){
		sprintf(buffer, ",%f", sensor.readFloatHumidity());
		*_header += buffer;
	};
	
}