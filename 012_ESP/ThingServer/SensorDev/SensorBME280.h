#ifndef SENSORBME280_H
#define SENSORBME280_H
#include <Arduino.h>
#include <stdint.h>
#include <vector>
#include <string>
#include <stdlib.h> 
#include "SparkFunBME280.h"   //BME280 Library
#include "WebInterface.h"
#include "Sensors.h"

class QSensorBME280 : public SensorInterface {
public:
	QSensorBME280();

//*****These functions satisfy the abstract class SensorInterface*****//
	void initialize();
	//Check for existance and readiness
	bool isGood();
	//get settings
	void buildJsonStr( void );
	//put settings
	void parseJsonStr( void );
	//get header
	void getHeader( String * _header );
	//get data
	void getData( String * _header );
//*****End of abstract class functions********************************//

private:
	BME280 sensor;
	bool celsiusEnabled = false;
	bool fahrenheitEnabled = false;
	bool pressureEnabled = false;
	bool humidityEnabled = false;
};
#endif