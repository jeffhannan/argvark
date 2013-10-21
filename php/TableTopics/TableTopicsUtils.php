<?php
// Jeff Hannan

include_once("TableTopics/TableTopicsSQL.php");
include_once("TableTopics/TableTopicsQueries.php");
//
// potentially one-off functions. None of these call each other, only the above functions.
//
// none of the functions in here call each other, they only call tabletopicsqueries or tabletopicsSQL

function tabletopics_get_record_by_id_first($id_topic_is_set, $id_topic, $topic_name)
{
    // Prioritise by id for searching
    if ($id_topic_is_set){
        list($success, $error_message, 
            $result) = tabletopics_select_by_id($id_topic);
    }
    else{
        list($success, $error_message, 
            // Query by name for the topic record - enforce name when searching by name
            $result_select) = tabletopics_select_by_enforced_name($topic_name);
    }
    
    if (!$success) { $error_message = utils_prepend_error_message($error_message, 
        "tabletopics_get_record_by_id_first"); }
        
        /*
    if ($success){ list($success, $error_message) = 
        // Check that a topic is found    
        sql_check_result($result);
    }
    */
    if ($success){ 
        // Check the result for a valid record
        $success = sql_rows_found($result_select);        
        if ($id_topic_is_set){
            if (!$success){$error_message = utils_create_user_error_message("Topic with id " . $id_topic . " not found.");}
        } else {
            if (!$success){$error_message = utils_create_user_error_message("Topic with name " . $topic_name . " not found.");}
        }
    }
    
    /*
    if (!$success) { $error_message = utils_prepend_error_message($error_message, 
        "tabletopics_get_record_by_id_first"); }
        */

    return array($success, $error_message, $result_select); 
}



function tabletopics_get_topic_id_by_id_first($id_topic_is_set, $id_topic, $topic_name)
{
    // Prioritise by id for searching. These functions both check for a valid result.
    if ($id_topic_is_set){
        list($success, $error_message) =  
            tabletopics_confirm_topic_id($id_topic);
    }  
    else{
        list($success, $error_message, 
            $id_topic) = tabletopics_get_topic_id($topic_name);
    }
    
    if (!$success) { $error_message = utils_prepend_error_message($error_message, 
        "tabletopics_get_topic_id_by_id_first"); }

    return array($success, $error_message, $id_topic); 
}


function tabletopics_get_topic_id_if_not_set($topic_id_is_set, $topic_name)
{
    if (!$topic_id_is_set){
        list($success, $error_message, 
            $topic_id_value) = tabletopics_get_topic_id($topic_name);
    }
    
    if (!$success) { $error_message = utils_prepend_error_message($error_message, 
        "tabletopics_get_topic_id_if_not_set"); }

    return array($success, $error_message, $topic_id_value); 
}


function tabletopics_add_topic_if_not_in($topic_name)
{
    $id_topic = -1;
    
    // Make an initial query on the topic name, to see if it is in the database
    $enforced_topic_name = tabletopics_enforce_name_format($topic_name);
    
    list($success, $error_message, 
        $result) = tabletopics_select_by_name($enforced_topic_name);
        
    // Insert the topic, if not already in. If it is already in, that's fine.
    if ($success){
        $topic_exists = sql_rows_found($result);
        
        if ($topic_exists){
            // If the topic exists, extract topic id from result
            list(
                $id_topic) = tabletopics_extract_topic_id($result);
        } else {
            // If the topic doesn't exist in the database, insert it
            list($success, $error_message, 
                $id_topic) = tabletopics_insert_enforced_topic($enforced_topic_name);
        }
    }
    
    if (!$success) { $error_message = utils_prepend_error_message($error_message, 
        "tabletopics_add_topic_if_not_in"); }
    
    return array($success, $error_message, $id_topic); 
}

?> 
