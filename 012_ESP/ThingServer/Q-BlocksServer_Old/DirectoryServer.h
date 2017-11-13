#ifndef DIRECTORY_SERVER_H
#define DIRECTORY_SERVER_H
#include <string>
#include <vector>
#include <WiFiClient.h>
#include <ESPWebServer.h>
#include "FS.h"
#include "SD.h"


class FilePath{
public:
	FilePath( void ){};
	~FilePath( void ){};
//	typedef std::function<void(void)> RequestHandlerFn;
	void requestHandler( void );
//	RequestHandlerFn getRequestHandler( void ){
//		RequestHandlerFn temp = &FilePath::requestHandler;
//		return temp;
//	}
	std::string path;
	std::string HTMLpath;
	long int size;
	
};

class FileServer : public ESPWebServer
{
public:
	FileServer( int port );
	~FileServer(){};
	int mountCard( void );
	int setCardRoot( const char * );
	int setHTTPRoot( const char * );
	int startServer( void );
	void buildDirectory(const char * dirname, uint8_t levels);
//protected:
	fs::FS * fs;
	String cardRoot;
	String HTTPRoot;
	std::vector< FilePath > files;
};

#endif