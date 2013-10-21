<?php
// Jeff Hannan
include_once("mysql_connect.php");
include_once("Common/Common.php");
include_once("TableTopicHierarchy/TableTopicHierarchy.php");
include_once("TableTopics/TableTopics.php");
include_once("APIUtils/LoadTopicLinksUtils.php");

    // Initialise
    list ($success, $error_message, $connection, $json) = utils_init_api();
    
    if ($success){ list($success, $error_message, 
        $topic_id_is_set, $topic_id_value, $topic_name_value, $direction_value) = loadtopiclinks_check_vars();
    }
    if ($success){ list( 
        $no_of_entries_to_load, $no_of_entries_in_page, $entries_start) = utils_get_page_info_from_vars();
    }
    if ($success){ list($success, $error_message, 
        // Connect to database
        $connection) = sql_database_connect();
    }      
    
    // Gather information for the main load query
    if ($success){ list($success, $error_message, 
        // Get the topic id, searching for it by name if not already set
        $topic_id_value) = tabletopics_get_topic_id_if_not_set($topic_id_is_set, $topic_name_value);
    }    
    if ($success){ list( 
        // Given direction, determine which fields are used for SELECT and WHERE in the SQL query
        $relation_select, $relation_where) = utils_get_relations($direction_value);
    }

    // Make the main load query
    if ($success){ list($success, $error_message, 
        // Select all children or all parents, of the topic
        $result_select) = tabletopichierarchy_multi_select_relation_order_limit($topic_id_value, $relation_where, $relation_select, $entries_start, $no_of_entries_to_load);
    }    
    
    // Create json output 
    if ($success){ list( 
        $json) = loadtopiclinks_create_json($result_select, $no_of_entries_in_page, $no_of_entries_to_load);
    }      
 
    sql_close_script($connection, $success, $json, $error_message, TRUE);
?>
