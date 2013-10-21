<?php
// Jeff Hannan
include_once("mysql_connect.php");
include_once("Common/Common.php");
include_once("APIUtils/SelectTopicLinkUtils.php");
include_once("TableTopicHierarchy/TableTopicHierarchy.php");

    // Initialise
    list ($success, $error_message, $connection, $json) = utils_init_api();

    if ($success){ list($success, $error_message, 
        // Get vars and check they are set correctly
        $relationship_value) = selecttopiclink_check_vars();
    }
    if ($success){ list($success, $error_message, 
        // Connect to database
        $connection) = sql_database_connect();
    }      
    
    if ($success){ list($success, $error_message, 
        // Increment selection count for the relationship (a link between 2 topics)
        $result_increment) = tabletopichierarchy_selection_count_increment($relationship_value);
    }      
    
    sql_close_script($connection, $success, $json, $error_message, TRUE);
?>
