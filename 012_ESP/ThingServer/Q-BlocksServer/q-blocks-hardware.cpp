#include <Arduino.h>
#include "q-blocks-hardware.h"
#include "PanelComponents.h"
#include "HardwareInterfaces.h"

QHardware::QHardware( void ){
}
	
void QHardware::init( void ){
	userButton.setHardware( new ArduinoDigitalIn( LOG_SWITCH_PIN ), 0);
	
	pinMode( LED_RED_PIN, OUTPUT );
	pinMode( LED_GREEN_PIN, OUTPUT );
	
	setLeds( red );
	
}

void QHardware::setLeds( LedColor _color ){
	switch( _color )
	{
		case red:
			digitalWrite( LED_RED_PIN, 1 );
			digitalWrite( LED_GREEN_PIN, 0 );
		break;
		case yellow:
			digitalWrite( LED_RED_PIN, 1 );
			digitalWrite( LED_GREEN_PIN, 1 );
		break;
		case green:
			digitalWrite( LED_RED_PIN, 0 );
			digitalWrite( LED_GREEN_PIN, 1 );
		break;
		case off:
		default:
			digitalWrite( LED_RED_PIN, 0 );
			digitalWrite( LED_GREEN_PIN, 0 );
		break;
	}
}

void QHardware::tick(){
	if(nextTick != 0){
		userButton.freshen(nextTick);
		if( userButton.serviceFallingEdge() ) setLeds( yellow );
		if( userButton.serviceRisingEdge() ) setLeds( green );
		nextTick = 0;
	}
		
}