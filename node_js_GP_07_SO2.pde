/*
* GPL 3 libelium
*  Design:            David Gascón 
*  Implementation:    Alejandro Gállego
*  Modificado:	      gurumelo
*/
#include <WaspSensorGas_Pro.h>
#include <WaspFrame.h>
Gas SO2(SOCKET_2);
float concentration;
float temperature;
void setup()
{
 
}	
void loop()
{
    SO2.ON();
    PWR.deepSleep("00:00:02:00", RTC_OFFSET, RTC_ALM1_MODE1, ALL_ON);
    concentration = SO2.getConc();
    temperature = SO2.getTemp();
    USB.print(concentration);
    USB.print("#");
    USB.print(temperature);
    USB.print("\r\n");
    SO2.OFF();
    PWR.deepSleep("00:00:01:00", RTC_OFFSET, RTC_ALM1_MODE1, ALL_OFF);
}
