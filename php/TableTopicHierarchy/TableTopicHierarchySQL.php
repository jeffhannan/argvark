<?php
// Jeff Hannan


function tabletopichierarchy_select_all()
{
    $query = "SELECT * ".
        "FROM tabletopichierarchy ";
        
    return sql_submit_query($query, "tabletopichierarchy_select_all");
}

function tabletopichierarchy_select($id_parent, $id_child)
{
    $query = "SELECT * ".
        "FROM tabletopichierarchy ".
        "WHERE id_parent = '$id_parent' ".
        "AND id_child = '$id_child' ";
        
    return sql_submit_query($query, "tabletopichierarchy_select");
}

//function TableTopicHierarchySelectById($id_relationship)
function tabletopichierarchy_select_by_id($id_relationship)
{
    $query = "SELECT * ".
        "FROM tabletopichierarchy ".
        "WHERE id_relationship = $id_relationship ";
        
    return sql_submit_query($query, "tabletopichierarchy_select_by_id");
}

//function TableTopicHierarchySelectByChild($id_child)
function tabletopichierarchy_select_by_child_id($id_child)
{
    $query = "SELECT * ".
        "FROM tabletopichierarchy ".
        "WHERE id_child = '$id_child' ";
        
    return sql_submit_query($query, "tabletopichierarchy_select_by_child_id");
}

function tabletopichierarchy_select_by_parent_id($id_parent)
{
    $query = "SELECT * ".
        "FROM tabletopichierarchy ".
        "WHERE id_parent = '$id_parent' ";
        
    return sql_submit_query($query, "tabletopichierarchy_select_by_parent_id");
}

function tabletopichierarchy_insert($id_parent, $id_child)
{
    $query = "INSERT INTO tabletopichierarchy (id_parent, id_child) ".
        "VALUES ('$id_parent', '$id_child') ";
    
    return sql_submit_query($query, "tabletopichierarchy_insert");
}

function tabletopichierarchy_delete_by_id($id_relationship)
{
    $query = "DELETE ".
        "FROM tabletopichierarchy ".
        "WHERE id_relationship = '$id_relationship' ";
    
    return sql_submit_query($query, "tabletopichierarchy_delete_by_id");
}

function tabletopichierarchy_selection_count_increment($id_relationship)
{
    $query = "UPDATE tabletopichierarchy ".
        "SET selection_count = selection_count + 1 ".
        "WHERE id_relationship = '$id_relationship' ";
    
    return sql_submit_query($query, "tabletopichierarchy_selection_count_increment");
}


?> 
