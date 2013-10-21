<?php
// Jeff Hannan

function addargtopic_check_vars()
{
    $error_message = null;
    
    list ($topic_name_is_set, $topic_name_is_empty, $topic_name_value) = utils_get_var_string("arg_topic_name");
    list ($arg_is_set, $arg_value) = utils_get_var_numeric("id_argument");

    // Check vars
    $success = ($arg_is_set && !$topic_name_is_empty);
    if (!$success) { $error_message = utils_create_user_error_message("Vars not set correctly"); }
    
    // Return only the required info
    return array($success, $error_message, 
        $topic_name_value, $arg_value);
}


?> 
