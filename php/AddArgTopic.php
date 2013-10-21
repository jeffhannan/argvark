<?php
// Jeff Hannan
include_once("mysql_connect.php");
include_once("Common/Common.php");
include_once("APIUtils/AddArgTopicUtils.php");
include_once("TableArgTopics/TableArgTopics.php");
include_once("TableTopics/TableTopics.php");

    // Initialise
    list ($success, $error_message, $connection, $json) = utils_init_api();

    if ($success){ list($success, $error_message, 
        // Get vars and check they are set correctly
        $topic_name_value, $arg_value) = addargtopic_check_vars();
    }
    if ($success){ list($success, $error_message, 
        // Connect to database
        $connection) = sql_database_connect();
    }  
    
    if ($success){ list($success, $error_message, 
        // Need to find the topic id to search for tags
        $id_topic) = tabletopics_get_topic_id($topic_name_value);
    }      
    if ($success){ list($success, $error_message) =  
        // Don't allow multiple - query for existing entries with that topic    
        tableargtopics_check_link_not_in($arg_value, $id_topic);
    }
    if ($success){ list($success, $error_message, 
        // Insert the new topic tag
        $result_insert_tag) = tableargtopics_insert($arg_value, $id_topic);
    }
    
    if ($success){
        // For now, can output a message - no json expected
        echo ("Successfully inserted<br>");
    }
    
    sql_close_script($connection, $success, $json, $error_message, TRUE);
?>
