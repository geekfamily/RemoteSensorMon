Remote Sensor Monitor
=====================
This project is part of a site that I built for the more maker type projects I work on.  

It will allow you to see how I managed to get a Raspberry PI(RPI) hosting a Node server to monitor an Arduino and report on the state of sensors.

You do not have to run this on a Raspberry PI as the code will run just as well on a Mac/Linux machine its just more fun to run it from the PI

Requirements
------------

Hardware

*  Raspberry PI (model B) - Want to [buy one](https://www.sparkfun.com/products/11546)?
*  Arduino - I use an [Arduino UNO](http://arduino.cc/en/Main/ArduinoBoardUno "UNO"), get [one here](https://www.sparkfun.com/products/11021)
*  PIR Motion Sensor - [This one](https://www.sparkfun.com/products/8630 "PIR Sensor") is similar to mine
*  LED - Any color, it is just used to test everything is working
*  Micro USB Cable - Used to connect arduino to RPI/Computer
*  SD Card (for RPI) - [at least 4GB](http://elinux.org/RPi_SD_cards "SD Cards")
  
Other

*  [Raspbian](http://www.raspbian.org/ "Raspbian") OS for the RPI
*  [NodeJS](http://nodejs.org/ "NodeJS") 0.10.x ARM binary package
*  [Duino](https://github.com/ecto/duino "Duino Framework") for connecting to the Arduino from NodeJS
*  Working knowledge of [Arduino IDE](http://arduino.cc/en/main/software "Arduino") and uplaoding code to the Arduino
*  Basic knowledge of wiring an Arduino

Hardware Installation
---------------------

To make this project work you will need to build the following circuit.  In case you are wondering, the grey object on the right with the black 'eyes' is the PIR sensor. 

![alt tag](http://geekfamily.github.io/RemoteSensorMon/img/RemoteSensorMon_bb.png)

Once the circuit is built you need to load the Duino code onto the Arduino.  The code can be found in the src directory of the Duino library and the file is called 'du.ino'.  
* All you need to do is load the file in the Arduino IDE
* Click the verify/compile (checkmark icon) button
* Once the code is verified click the upload (arrow icon) button and it will be transfered to the Arduino

Software Installation
---------------------

1. This project is a Node based server with a very basic single page in it
2. If you need help getting node running on your RPI [this link](http://blog.rueedlinger.ch/2013/03/raspberry-pi-and-nodejs-basic-setup/) is a great help
3. Grab the code by whatever means suits you
4. If your setup is like mine (headless RPI) you will probably have to use SSH to copy the files to your PI at this point
5. Once all the files are in a directory on your RPI you can configure the Node project (from the root directory of the project installation):

        npm install

6. At this point all the npm packages have been installed and you will now need to make a modification to the Board.js file of duino, so take your favorite editor (Nano in my case) and enter the following:

        nano node_modules/duino/lib/board.js

7. Find the following line:

        ls /dev | grep usb

8. It should read as follows if you want the code to search correctly for the correct USB port

        ls /dev | grep -E 'usb|ttyACM*'

9. Save the file and your ready for testing

Testing
-------
1. Plug the arduino USB cable into the RPI (or computer if you dont have a RPI).
2. On the RPI from the root directory of your project type the following:

        /etc/init.d/nodejs.sh start

3. If you are using a compueter you can type:
 
        node server.js

4. The node server should now be running (without any errors)
5. In your favorite (I havent tested this in IE) browser goto http://{ip address of your RPI}:8080/
6. You should now be able to click the 'Led On' button and the LED on the Arduino should go on... 
7. If it doesnt: start by checking the command line for errors, ensure everything is plugged in correctly
8. I it does then you can try moving in front of the PIR sensor, if all is well you should see the 'motion detected' message should be displayed
9. Your done!


Acknowledgements
----------------
Thanks to [Javier Baena](http://jvrbaena.github.io/blog/2013/07/15/node-dot-js-arduino-raspberry-pi-ii/) for pointing out the issue in the Duino code library



