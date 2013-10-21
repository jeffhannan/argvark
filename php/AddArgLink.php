<?php
// Jeff Hannan
include_once("mysql_connect.php");
include_once("Common/Common.php");
include_once("TableArgHierarchy/TableArgHierarchy.php");
include_once("TableArguments/TableArguments.php");
include_once("APIUtils/AddArgLinkUtils.php");

    // Initialise
    list ($success, $error_message, $connection, $json) = utils_init_api();
    
    if ($success){ list($success, $error_message, 
        $title_value, $parent_value, $child_is_set, $child_value) = addarglink_check_vars();
    }
    if ($success){ list($success, $error_message, 
        // Connect to database
        $connection) = sql_database_connect();
    }      

    if ($success){ list($success, $error_message, 
        // Get arg id. Either insert if new, or use $child_value
        $arg_id) = addarglink_insert_arg_if_new($child_is_set, $child_value, $title_value);
    }      
    if ($success){ list($success, $error_message)
        // Check that the link doesn't already exist.  
        = tablearghierarchy_check_link_not_in($parent_value, $arg_id);
    }
    if ($success){ list($success, $error_message, 
        // If it doesn't already exist, then insert the link
        $result_insert_link) = tablearghierarchy_insert($parent_value, $arg_id);
    }

    sql_close_script($connection, $success, $json, $error_message, TRUE);
?>
