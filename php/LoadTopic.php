<?php
// Jeff Hannan
include_once("mysql_connect.php");
include_once("Common/Common.php");
include_once("APIUtils/LoadTopicUtils.php");
include_once("TableTopics/TableTopics.php");

    // Initialise
    list ($success, $error_message, $connection, $json) = utils_init_api();
    
    if ($success){ list($success, $error_message, 
        // Get vars and check they are set correctly
        $topic_id_is_set, $topic_id_value, $topic_name_value) = loadtopic_check_vars();
    }      
    if ($success){ list($success, $error_message, 
        // Connect to database
        $connection) = sql_database_connect();
    }      

    // Make the main load query
    if ($success){ list($success, $error_message, 
        // Search for the topic, by id
        $result_select) = tabletopics_get_record_by_id_first($topic_id_is_set, $topic_id_value, $topic_name_value);
    }    
    
    // Create json output 
    if ($success){ list( 
        // Create json output
        $json) = loadtopic_create_json($result_select);
    }      
     
    sql_close_script($connection, $success, $json, $error_message, TRUE);
?>
