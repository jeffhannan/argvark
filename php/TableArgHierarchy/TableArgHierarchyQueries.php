<?php
// Jeff Hannan

    
function tablearghierarchy_check_link_not_in($parent_value, $id_child)
{
    // Select the link
    list($success, $error_message,
        $result_select_link) = tablearghierarchy_select($parent_value, $id_child);
                
    if (!$success) { $error_message = utils_prepend_error_message($error_message, 
        "tablearghierarchy_check_link_not_in"); }    

        /*
    // Check link not already in
    if ($success){ list($success, $error_message)  
        = sql_check_result_empty($result_select_link);
        
        if (!$success) { $error_message = utils_prepend_error_message($error_message, "Link already exists."); }
    }
    */
    if ($success){ 
        // Check link not already in
        $success = sql_no_rows_found($result_select_link);        
        if (!$success){$error_message = utils_create_user_error_message("Did not add arg link - one already exists with parent " . $parent_value . " and child ". $id_child . ".");}
    }

    /*
    if (!$success) { $error_message = utils_prepend_error_message($error_message, 
        "tablearghierarchy_check_link_not_in"); }    
        */
    
   return array($success, $error_message);
}


?> 
