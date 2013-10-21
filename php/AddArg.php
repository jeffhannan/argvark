<?php
// Jeff Hannan
include_once("mysql_connect.php");
include_once("Common/Common.php");
include_once("APIUtils/AddArgUtils.php");
include_once("TableArguments/TableArguments.php");
include_once("TableArgTopics/TableArgTopics.php");
include_once("TableTopics/TableTopics.php");

    // Initialise
    list ($success, $error_message, $connection, $json) = utils_init_api();

    if ($success){ list($success, $error_message, 
        // Get vars and check they are set correctly
        $title_value, $topic_is_set, $topic_value, $topic_name_value) = addarg_check_vars();
    }
    if ($success){ list($success, $error_message, 
        // Connect to database
        $connection) = sql_database_connect();
    }          
    
    // Get safe version of title
    if ($success){
        $safe_title = sql_quote_smart($title_value);
    }
    if ($success){ list($success, $error_message, 
        // Insert title
        $result_insert) = tablearguments_insert($safe_title);
    }      
    if ($success){ list($success, $error_message, 
        // Query for the newly inserted arg
        $id_argument) = sql_get_last_insert_id();
    }      
    if ($success){ list($success, $error_message, 
        // Extract the newly inserted arg, and query for its record
        $result_select) = tablearguments_select_by_id($id_argument);
    }      
    if ($success){ list( 
        // Create json output
        $json) = tablearguments_create_json($result_select);
    }                                               
    
    // Should do this before adding the argument, unless I'm going to allow new topics to be added
    
    if ($success){ list($success, $error_message, 
        // Search for the topic, by id
        $result_select_topic) = tabletopics_get_record_by_id_first($topic_is_set, $topic_value, $topic_name_value);
    }    
    if ($success){
        // Extract the topic id from the record
        list($id_topic) = tabletopics_extract_topic_id($result_select_topic);
    }
    if ($success){ list($success, $error_message, 
        // Insert an arg topic entry, to link the topic to the arg. i.e. if arg added on the topic page.
        $result_insert_tag) = tableargtopics_insert($id_argument, $id_topic);
    }   
 
    sql_close_script($connection, $success, $json, $error_message, TRUE);
?>
