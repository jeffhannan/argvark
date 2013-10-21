<?php
// Jeff Hannan
include_once("mysql_connect.php");
include_once("Common/Common.php");
include_once("APIUtils/LoadArgListUtils.php");
include_once("TableArgTopics/TableArgTopics.php");
include_once("TableArguments/TableArguments.php");
include_once("TableTopicHierarchy/TableTopicHierarchy.php");
include_once("TableTopics/TableTopics.php");

    // Initialise
    list ($success, $error_message, $connection, $json) = utils_init_api();

    if ($success){ list($success, $error_message, 
        // Get vars and check they are set correctly
        $topic_id_is_set, $topic_id_value, $topic_name_value) = loadarglist_check_vars();
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
    if ($success){ list($success, $error_message, 
        // Build a list of topics to search for
        $topic_search_list_string) = tabletopichierarchy_build_search_list($topic_id_value);
    }    

    // Make the main load query
    if ($success){ list($success, $error_message, 
        // Search for args tagged with any topic in the topic search list, and those with topic_id listed first
        $result_select) = tableargtopics_select_arg_by_id_array_string_limit($topic_id_value, $topic_search_list_string, $entries_start, $no_of_entries_to_load);
    }    
    
    // Create json output 
    if ($success){ list( 
        // Create json output
        $json) = loadarglist_create_json($result_select, $no_of_entries_in_page, $no_of_entries_to_load);
    }      
 
    sql_close_script($connection, $success, $json, $error_message, TRUE);
?>
