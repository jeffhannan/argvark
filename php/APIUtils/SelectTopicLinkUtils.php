<?php
// Jeff Hannan

function selecttopiclink_check_vars()
{
    $error_message = null;
    
    list ($relationship_is_set, $relationship_value) = utils_post_var_numeric("id_relationship");

    // Check vars
    $success = $relationship_is_set;
    if (!$success) { $error_message = utils_create_user_error_message("Vars not set correctly"); }
    
    // Return only the required info
    return array($success, $error_message, 
        $relationship_value);
}

?> 
