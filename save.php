<?php
$fileTotalNum = $_POST["fileTotalNum"];
$roomImages = new stdClass();
$roomImages->{"totalNum"} = $fileTotalNum;
$timestemp = time();
for($_i = 0; $_i < $fileTotalNum; $_i++){
  if(!empty($_FILES['file'.$_i]['name'])){
    $img0 = $_FILES['file'.$_i]['name'];
    $ext = pathinfo($img0, PATHINFO_EXTENSION);
    $newFileName = ($timestemp+(11 * $_i)). "." .$ext;
    $path = "images/$newFileName";
    copy($_FILES['file'.$_i]['tmp_name'], $path);
    $roomImages->{$_i} = $path;
  }
}
$a = json_encode($roomImages);
$b = $_POST["roomTags"];
echo "一並傳入了 $fileTotalNum 張圖片<br><br>";
echo "以下是格式化好要寫進圖片欄位的內容(物件格式)<br><span>";
print_r($a);
echo "</span><br><br>以下是格式化好要寫進 tags 欄位的內容(陣列格式)<br><span>";
print_r($b);