<?php
// Jeff Hannan
include_once("mysql_connect.php");
include_once("Common/Common.php");
include_once("APIUtils/LoadArgLinksUtils.php");
include_once("TableArgHierarchy/TableArgHierarchy.php");
include_once("TableArguments/TableArguments.php");

    // Initialise
    list ($success, $error_message, $connection, $json) = utils_init_api();

    if ($success){ list($success, $error_message, 
        // Get vars and check they are set correctly
        $arg_value, $direction_value) = loadarglinks_check_vars();
    }
    if ($success){ list( 
        $no_of_entries_to_load, $no_of_entries_in_page, $entries_start) = utils_get_page_info_from_vars();
    }
    if ($success){ list($success, $error_message, 
        // Connect to database
        $connection) = sql_database_connect();
    }      
    
    // Gather information for the main load query
    if ($success){ list( 
        // Given direction, determine which fields are used for SELECT and WHERE in the SQL query
        $relation_select, $relation_where) = utils_get_relations($direction_value);
    }

    // Make the main load query
    if ($success){ list($success, $error_message, 
        // Select all children or all parents, of the arguments
        $result_select) = tablearghierarchy_multi_select_relation_order_limit($arg_value, $relation_where, $relation_select, $entries_start, $no_of_entries_to_load);
    }
    
    // Create json output 
    if ($success){ list( 
        // Create json output
        $json) = loadarglinks_create_json($result_select, $no_of_entries_in_page, $no_of_entries_to_load);
    }      

    sql_close_script($connection, $success, $json, $error_message, TRUE);
?>
