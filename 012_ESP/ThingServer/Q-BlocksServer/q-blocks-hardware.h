#ifndef Q_BLOCKS_HARDWARE_H
#define Q_BLOCKS_HARDWARE_H

#include "panelComponents.h"

const int LED_RED_PIN		= 16; // Red LED Connected to Digital Pin 16
const int LED_GREEN_PIN		= 4;  // Green LED Connected to Digital Pin 4
const int LOG_SWITCH_PIN	= 0;  // Momentary Switch Connected to Digital Pin 0
const int SD_INSERTED_PIN	= 17; // CD Pin Connected to Digital Pin 17
const int SD_CS_PIN			= 5;  // SPI/SD Card Chip Select Digital Pin 5

enum LedColor {
	red,
	yellow,
	green,
	off
};

class QHardware {
public:
	QHardware( void );
	void init( void );
	void setLeds( LedColor _color );
	void tick();
	Button userButton;
	int nextTick;
};


#endif