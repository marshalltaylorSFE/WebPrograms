#ifndef SENSORS_H
#define SENSORS_H

#include <Arduino.h>
#include <stdint.h>
#include <vector>
#include <string>
#include <stdlib.h> 
#include "WebInterface.h"

class QSensors {
public:
	QSensors(){};
	std::vector< SensorInterface * > sensorVector;
};

#endif