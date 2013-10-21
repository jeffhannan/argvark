<?php
// Jeff Hannan
include_once("mysql_connect.php");
include_once("Common/Common.php");
include_once("APIUtils/LoadArgTopicsUtils.php");
include_once("TableArgTopics/TableArgTopics.php");
include_once("TableTopics/TableTopics.php");

    // Initialise
    list ($success, $error_message, $connection, $json) = utils_init_api();

    if ($success){ list($success, $error_message, 
        // Get vars and check they are set correctly
        $arg_value) = loadargtopics_check_vars();
    }
    if ($success){ list( 
        $no_of_entries_to_load, $no_of_entries_in_page, $entries_start) = utils_get_page_info_from_vars();
    }
    if ($success){ list($success, $error_message, 
        // Connect to database
        $connection) = sql_database_connect();
    }      

    // Make the main load query
    if ($success){ list($success, $error_message, 
        // Search for the topics, by arg id
        $result_select) = tableargtopics_multi_select_relation_order_limit($arg_value, $entries_start, $no_of_entries_to_load);
    }    
    
    // Create json output 
    if ($success){ list( 
        // Create json output
        $json) = loadargtopics_create_json($result_select, $no_of_entries_in_page, $no_of_entries_to_load);
    }      

    sql_close_script($connection, $success, $json, $error_message, TRUE);
?>
