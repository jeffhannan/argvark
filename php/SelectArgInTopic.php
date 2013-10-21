<?php
// Jeff Hannan
include_once("mysql_connect.php");
include_once("Common/Common.php");
include_once("APIUtils/SelectArgInTopicUtils.php");
include_once("TableArgTopics/TableArgTopics.php");
include_once("TableTopics/TableTopics.php");

    // Initialise
    list ($success, $error_message, $connection, $json) = utils_init_api();

    if ($success){ list($success, $error_message, 
        // Get vars and check they are set correctly
        $arg_value, $topic_name_value) = selectargintopic_check_vars();
    }
    if ($success){ list($success, $error_message, 
        // Connect to database
        $connection) = sql_database_connect();
    }      
    
    // Unlike other cases, it is possible to select an arg not in the current topic i.e. it is tagged with a descendent topic.
    // But the arg has been selected from within the current topic. And the idea is that selection reinforces the association. 
    // So I have decided to tag the arg with the topic, if not already, and increment the selection count on it.  
    if ($success){ list($success, $error_message, 
        // Need to find the topic id to search for links, so if it isn't supplied, get it
        $topic_id_value) = tabletopics_get_topic_id($topic_name_value);
    }      
    if ($success){ list($success, $error_message, 
        // Get the id. Either it is already in the database or it needs inserting.
        $id_tag) = tableargtopics_get_or_insert_tag($arg_value, $topic_id_value);
    }   
    
    if ($success){ list($success, $error_message, 
        // Increment selection count for the tag (a link between an arg and a topic)
        $result_increment) = tableargtopics_selection_count_increment($id_tag);
    }      
    
    sql_close_script($connection, $success, $json, $error_message, TRUE);
?>
