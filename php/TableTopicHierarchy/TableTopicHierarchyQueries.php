<?php
// Jeff Hannan

function tabletopichierarchy_check_link_not_in($parent_topic_id, $child_topic_id)
{
    // Next, check if the link already exists. Haven't got parent/child as unique
    list($success, $error_message, 
        $result_select_link) = tabletopichierarchy_select($parent_topic_id, $child_topic_id);
                
    if (!$success) { $error_message = utils_prepend_error_message($error_message, 
        "tabletopichierarchy_check_link_not_in"); }    

    if ($success){ 
        // Check link not already in
        $success = sql_no_rows_found($result_select_link);        
        if (!$success){$error_message = utils_create_user_error_message("Did not add topic link - one already exists with parent " . $parent_topic_id . " and child ". $child_topic_id . ".");}
    }
    /*
    // Check link not already in
    if ($success){ list($success, $error_message)  
        = sql_check_result_empty($result_select_link);
        
        if (!$success) { $error_message = utils_prepend_error_message($error_message, "Link already exists."); }
    }

    if (!$success) { $error_message = utils_prepend_error_message($error_message, 
        "tabletopichierarchy_check_link_not_in"); }   
        */ 
    
    return array($success, $error_message);
}



?> 
                                                                                                        