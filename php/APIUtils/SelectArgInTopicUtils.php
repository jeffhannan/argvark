<?php
// Jeff Hannan

function selectargintopic_check_vars()
{
    $error_message = null;
    
    list ($arg_is_set, $arg_value) = utils_post_var_numeric("id_argument");
    list ($topic_name_is_set, $topic_name_is_empty, $topic_name_value) = utils_post_var_string("topic_name");

    // Check vars
    $success = $arg_is_set && !$topic_name_is_empty;
    if (!$success) { $error_message = utils_create_user_error_message("Vars not set correctly"); }
    
    // Return only the required info
    return array($success, $error_message, 
        $arg_value, $topic_name_value);
}

?> 
