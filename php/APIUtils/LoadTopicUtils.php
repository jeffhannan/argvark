<?php
// Jeff Hannan

function loadtopic_check_vars()
{
    $error_message = null;
    
    // Get vars
    list ($topic_id_is_set, $topic_id_value) = utils_get_var_numeric("id_topic");
    list ($topic_name_is_set, $topic_name_is_empty, $topic_name_value) = utils_get_var_string("topic_name");
    
    // Valid if either topic id or name is set
    $success = ($topic_id_is_set || !$topic_name_is_empty);    
    // Can put more useful message here
    //if (!$success) {$error_message = utils_create_user_error_message("Vars not set correctly"); }
    if (!$success) {
        $error_message = utils_create_user_error_message("Vars not set correctly");
        die(); 
        //trigger_error($error_message,E_USER_WARNING);
        }
    
    // Return only the required info
    return array($success, $error_message, 
        $topic_id_is_set, $topic_id_value, $topic_name_value);
}

function loadtopic_create_json($result_select)
{
    // Create json output
    $array_record = array(); 
    
    // Only using 1 record. The topic should be unique.         
    $row = mysql_fetch_array($result_select);       
    
    // Fields
    $array_record['id_topic'] = $row['id_topic'];
    $array_record['name'] = $row['name'];
    
    $json = json_encode($array_record);
    
    return array($json);    
}


?> 
