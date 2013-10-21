<?php
// Jeff Hannan

function addarglink_check_vars()
{
    $error_message = null;
    
    list ($title_is_set, $title_is_empty, $title_value) = utils_post_var_string("arg_link_title_text");
    list ($parent_is_set, $parent_value) = utils_post_var_numeric("id_parent");
    list ($child_is_set, $child_value) = utils_post_var_numeric("id_child");

    // Check vars - should have either child or title
    $success = ($parent_value && ($title_is_set || $child_is_set));
    if (!$success) { $error_message = utils_create_user_error_message("Vars not set correctly"); }
    
    // Return only the required info
    return array($success, $error_message, 
        $title_value, $parent_value, $child_is_set, $child_value);
}

function addarglink_insert_arg_if_new($child_is_set, $child_value, $title)
{
    $success = TRUE;
    $error_message = null;
    
    // This function checks the $child_is_set flag and only inserts if new
    $new_arg = (!$child_is_set || ($child_value == -1));
    
    if ($new_arg){
        list($success, $error_message, 
            $result_insert_arg) = tablearguments_insert($title);
            
        if ($success){ list($success, $error_message, 
            $arg_id) = sql_get_last_insert_id();
        }
    }
    else {
        $arg_id = $child_value;
    }
    
    if (!$success) { $error_message = utils_prepend_error_message($error_message, 
        "addarglink_insert_arg_if_new"); }    
    
    return array($success, $error_message, $arg_id);    
}



?> 
