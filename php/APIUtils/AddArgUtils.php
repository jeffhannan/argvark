<?php
// Jeff Hannan

function addarg_check_vars()
{
    $error_message = null;
    
    list ($title_is_set, $title_is_empty, $title_value) = utils_post_var_string("title");
    list ($topic_is_set, $topic_value) = utils_post_var_numeric("id_topic");
    list ($topic_name_is_set, $topic_name_is_empty, $topic_name_value) = utils_post_var_string("topic_name");

    // Check vars
    $success = (!$title_is_empty && ($topic_is_set || !$topic_name_is_empty));
    if (!$success) { $error_message = utils_create_user_error_message("Vars not set correctly"); }
    
    // Return only the required info
    return array($success, $error_message, 
        $title_value, $topic_is_set, $topic_value, $topic_name_value);
}

?> 
