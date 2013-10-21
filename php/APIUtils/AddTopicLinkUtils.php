<?php
// Jeff Hannan

function addtopiclink_check_vars()
{
    $error_message = null;
    
    list ($topic_is_set, $topic_value) = utils_post_var_numeric("id_topic");
    list ($topic_name_is_set, $topic_name_is_empty, $topic_name_value) = utils_post_var_string("topic_name");
    list ($name_is_set, $name_is_empty, $name_value) = utils_post_var_string("link_topic_name");
    list ($direction_is_set, $direction_value) = utils_post_var_numeric("link_direction");

    // Check vars
    $success = (($topic_is_set || !$topic_name_is_empty) && !$name_is_empty && $direction_is_set);
    if (!$success) { $error_message = utils_create_user_error_message("Vars not set correctly"); }
    
    // Return only the required info
    return array($success, $error_message, 
        $topic_is_set, $topic_value, $topic_name_value, $name_value, $direction_value);
}

function addtopiclink_get_relation_ids($direction_value, $id_topic, $link_topic_id)
{
    // Firstly, reset $parent_topic_id and $child_topic_id
    $parent_topic_id = -1;
    $child_topic_id = -1;
    if ($direction_value == "0")
    {
        $parent_topic_id = $id_topic;
        $child_topic_id = $link_topic_id;
    }
    else
    {
        $parent_topic_id = $link_topic_id;
        $child_topic_id = $id_topic;
    }
        
    return array($parent_topic_id, $child_topic_id);
}


?> 
