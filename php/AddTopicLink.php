<?php
// Jeff Hannan
include_once("mysql_connect.php");
include_once("Common/Common.php");
include_once("APIUtils/AddTopicLinkUtils.php");
include_once("TableTopicHierarchy/TableTopicHierarchy.php");
include_once("TableTopics/TableTopics.php");

    // Initialise
    list ($success, $error_message, $connection, $json) = utils_init_api();

    if ($success){ list($success, $error_message, 
        // Get vars and check they are set correctly
        $topic_is_set, $topic_value, $topic_name_value, $name_value, $direction_value) = addtopiclink_check_vars();
    }
    if ($success){ list($success, $error_message, 
        // Connect to database
        $connection) = sql_database_connect();
    }  
    
    if ($success){ list($success, $error_message, 
        // Check if the link topic is in the database, and if not, add it
        $link_topic_id) = tabletopics_add_topic_if_not_in($name_value);
    }          
    if ($success){ list($success, $error_message, 
        // Search for the current topic, rather than the link topic, to check it exists, and confirm its id
        $id_topic) = tabletopics_get_topic_id_by_id_first($topic_is_set, $topic_value, $topic_name_value);
    }   
    if ($success){ list( 
        // Set the parent and child ids based on the direction
        $parent_topic_id, $child_topic_id) = addtopiclink_get_relation_ids($direction_value, $id_topic, $link_topic_id);
    }        
    if ($success){ list($success, $error_message) =
        // Check that the link doesn't already exist.  
        tabletopichierarchy_check_link_not_in($parent_topic_id, $child_topic_id);
    }
    if ($success){ list($success, $error_message, 
        // Insert link
        $result_insert_link) = tabletopichierarchy_insert($parent_topic_id, $child_topic_id);
    }

    if ($success){
        echo ("parent $parent_topic_id child $child_topic_id  <br>");
        echo ("success<br>");
    }    
    
    sql_close_script($connection, $success, $json, $error_message, TRUE);
?>
