

# Twilio

# Steps of how to run the application

1. Download ngrok from this link https://ngrok.com/download and run the file.
2. Clone this repository and run the Node js application on your local host.
3. Now open terminal and go in the directory where ngork is there and run the command -> "./ngrok http 3000;" to route all the requests that were supposed to go to port 3000 to a link that will be provided by ngrok.
4. Now open that link in the browser to use the application.

5. Open Mysql and run this script. 



DROP TABLE IF EXISTS `Call_History`;


CREATE TABLE `Call_History` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `phone_number` varchar(45) DEFAULT NULL,
  `fizzbuzz` varchar(1000) DEFAULT NULL,
  `delay` varchar(45) DEFAULT NULL,
  `time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=latin1;


ENJOY..
