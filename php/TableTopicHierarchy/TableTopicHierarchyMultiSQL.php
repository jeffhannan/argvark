<?php
// Jeff Hannan

include_once("Common/Common.php");

function tabletopichierarchy_multi_select_relation_order_limit($id_topic, $relation_where, $relation_select, $start, $number)
{
    // Wrap in order to limit the result
    $query = "SELECT * FROM ( ".
                "SELECT * ".
                "FROM tabletopichierarchy AS H, tabletopics AS T ".
                "WHERE H.$relation_where = '$id_topic' ".
                "AND H.$relation_select = T.id_topic ".
                "ORDER BY H.selection_count DESC ".
            // Limit the result
            ") TTH LIMIT $start, $number";
        
    return sql_submit_query($query, "tabletopichierarchy_multi_select_relation_order_limit");
}
//
// relationWhere is the one being supplied, relationSelect is the one being obtained.
// e.g. select children where parent IN list. relationWhere = 'parent', relationSelect = 'child'
//function TableTopicHierarchyMultiSelectRelations($topicSearchListString, $relationWhere, $relationSelect)
function tabletopichierarchy_multi_select_relations($topic_search_list_string, $relation_where, $relation_select)
{
    $query = "SELECT Trs.id_topic ".
        "FROM tabletopics AS Trs, tabletopics AS Trw, tabletopichierarchy AS H ".
        "WHERE Trw.id_topic IN ($topic_search_list_string) ".
        "AND H.$relation_where = Trw.id_topic ".
        "AND H.$relation_select = Trs.id_topic ";
        
    return sql_submit_query($query, "tabletopichierarchy_multi_select_relations");
}


?> 
