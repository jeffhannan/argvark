<?php
// Jeff Hannan
    
function tableargtopics_extract_tag_id($query_result)
{
    // Get id_tag from the result
    $row = mysql_fetch_array($query_result);
    $id_tag = $row['id_tag'];
    
    return array($id_tag);
}
    
function tableargtopics_insert_and_get_tag($arg_value, $topic_id_value)
{
    // Need to insert a tag, then get it
    list($success, $error_message, 
        $result_insert_tag) = tableargtopics_insert($arg_value, $topic_id_value);
    
    if ($success){ list($success, $error_message, 
        // Get the id. Search for the arg topic, by arg id and topic id
        $result_select) = tableargtopics_select($arg_value, $topic_id_value);
    }   
    if ($success){ list(
        $id_tag) = tableargtopics_extract_tag_id($result_select);
    }
    
    if (!$success) { $error_message = utils_prepend_error_message($error_message, 
        "tableargtopics_insert_and_get_tag"); }    
    
    return array($success, $error_message, $id_tag);
}
    
    
function tableargtopics_get_or_insert_tag($arg_value, $topic_id_value)
{
    // Get the id. Search for the arg topic, by arg id and topic id
    list($success, $error_message, 
        $result_select) = tableargtopics_select($arg_value, $topic_id_value);

    if ($success)
    {
        $arg_topic_found = (mysql_num_rows($result_select) > 0);
    
        if ($arg_topic_found){
            // Get the id. Search for the arg topic, by arg id and topic id
            list($id_tag) = tableargtopics_extract_tag_id($result_select);
        }
        else {
            // Need to insert a tag, then get it
            list($success, $error_message, $id_tag) = tableargtopics_insert_and_get_tag($arg_value, $topic_id_value);
        }
    }
     
    if (!$success) { $error_message = utils_prepend_error_message($error_message, 
        "tableargtopics_get_or_insert_tag"); }    
    
    return array($success, $error_message, $id_tag);
}

function tableargtopics_check_link_not_in($arg_value, $id_topic)
{
    // Don't allow multiple - query for existing args with that topic    
    list($success, $error_message, 
        $result_arg_topics) = tableargtopics_select($arg_value, $id_topic);
            
    if (!$success) { $error_message = utils_prepend_error_message($error_message, 
        "tableargtopics_check_link_not_in"); }    
            
    if ($success){ 
        // Check link not already in
        $success = sql_no_rows_found($result_arg_topics);        
        if (!$success){$error_message = utils_create_user_error_message("Did not add topic tag - one already exists with arg " . $arg_value . " and topic ". $id_topic . ".");}
    }
    /*
    if ($success){ list($success, $error_message) =   
        // Check no existing entries
        sql_check_result_empty($result_arg_topics);
        
        if (!$success) { $error_message = utils_prepend_error_message($error_message, "Failed to insert  - tag already in."); }
    }

    if (!$success) { $error_message = utils_prepend_error_message($error_message, 
        "tableargtopics_check_link_not_in"); }    
        */
    
    return array($success, $error_message);
}
    


?> 
