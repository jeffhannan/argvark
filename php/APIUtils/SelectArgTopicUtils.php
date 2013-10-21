<?php
// Jeff Hannan

function selectargtopic_check_vars()
{
    $error_message = null;
    
    list ($tag_is_set, $tag_value) = utils_post_var_numeric("id_tag");

    // Check vars
    $success = $tag_is_set;
    if (!$success) { $error_message = utils_create_user_error_message("Vars not set correctly"); }
    
    // Return only the required info
    return array($success, $error_message, 
        $tag_value);
}

?> 
