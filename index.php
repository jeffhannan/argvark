<?php

    // Mobile check - by http://www.000webhost.com/forum Leder678 
    $mobile = false;
    if(strstr(strtolower($_SERVER['HTTP_USER_AGENT']), 'mobile') || strstr(strtolower($_SERVER['HTTP_USER_AGENT']), 'android'))
    {
        $mobile = true;
    }

    // If there is a topic, or no entry, then use OneTopic.
    if ($mobile)
    {
        $file = file_get_contents("html/TopicArgPageMobile.html");
        //$file = file_get_contents("html/TopicArgPage.html");
        echo $file;
    }
    else
    {
        $file = file_get_contents("html/TopicArgPage.html");
        echo $file;
    }
?>
