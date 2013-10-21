<?php
// Jeff Hannan
include_once("mysql_connect.php");
include_once("Common/Common.php");
include_once("APIUtils/SelectArgLinkUtils.php");
include_once("TableArgHierarchy/TableArgHierarchy.php");

    // Initialise
    list ($success, $error_message, $connection, $json) = utils_init_api();

    if ($success){ list($success, $error_message, 
        // Get vars and check they are set correctly
        $relationship_value) = selectarglink_check_vars();
    }
    if ($success){ list($success, $error_message, 
        // Connect to database
        $connection) = sql_database_connect();
    }      
    
    if ($success){ list($success, $error_message, 
        // Increment selection count for the relationship (a link between 2 args)
        $result_increment) = tablearghierarchy_selection_count_increment($relationship_value);
    }      
    
    sql_close_script($connection, $success, $json, $error_message, TRUE);
?>
