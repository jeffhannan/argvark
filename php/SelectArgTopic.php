<?php
// Jeff Hannan
include_once("mysql_connect.php");
include_once("Common/Common.php");
include_once("APIUtils/SelectArgTopicUtils.php");
include_once("TableArgTopics/TableArgTopics.php");

    // Initialise
    list ($success, $error_message, $connection, $json) = utils_init_api();

    if ($success){ list($success, $error_message, 
        // Get vars and check they are set correctly
        $tag_value) = selectargtopic_check_vars();
    }
    if ($success){ list($success, $error_message, 
        // Connect to database
        $connection) = sql_database_connect();
    }      
    
    if ($success){ list($success, $error_message, 
        // Increment selection count for the tag (a link between an arg and a topic)
        $result_increment) = tableargtopics_selection_count_increment($tag_value);
    }      
    
    sql_close_script($connection, $success, $json, $error_message, TRUE);
?>
