<?php
session_start();
require_once("twitteroauth.php"); //Path to twitteroauth library
 
$twitteruser = "Luseniik";
$notweets = 30;
$consumerkey = "X15TspbNq37WOw3f5kKbrJiZV";
$consumersecret = "vZsakltwboLudEgK1lKwiLAtfThYd2PbLNIIDQwOXqUfTL0bs4";
$accesstoken = "2908908316-6c01i96oh7oheFrT2c0E7twesIQpbvcLFSXDg3N";
$accesstokensecret = "0druFyjkLIfmhfXSvAL1Cws0JJvpVbW0pUnrwMJuMp0lw";
 
function getConnectionWithAccessToken($cons_key, $cons_secret, $oauth_token, $oauth_token_secret) {
  $connection = new TwitterOAuth($cons_key, $cons_secret, $oauth_token, $oauth_token_secret);
  return $connection;
}
 
$connection = getConnectionWithAccessToken($consumerkey, $consumersecret, $accesstoken, $accesstokensecret);
 
$tweets = $connection->get("https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=".$twitteruser."&count=".$notweets);
 
echo json_encode($tweets);
?>