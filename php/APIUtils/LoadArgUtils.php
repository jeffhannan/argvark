<?php
// Jeff Hannan

function loadarg_check_vars()
{
    $error_message = null;
    
    list ($arg_is_set, $arg_value) = utils_get_var_numeric("id_argument");

    // Check vars
    $success = $arg_is_set;
    if (!$success) { $error_message = utils_create_user_error_message("Vars not set correctly"); }
    
    // Return only the required info
    return array($success, $error_message, 
        $arg_value);
}



?> 
