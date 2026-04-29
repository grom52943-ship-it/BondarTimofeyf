<?php

#[Attribute]
class OnlyAdults {
    public function __construct() {
        file_put_contents("log.txt", "OnlyAdults used\n", FILE_APPEND);
    }
}

$users = [
    ["name" => "Андрій", "age" => 20, "email" => "andrii@mail.com"],
    ["name" => "Марія", "age" => 17, "email" => "maria@mail.com"],
    ["name" => "Богдан", "age" => 25, "email" => "bohdan@mail.com"],
    ["name" => "Катерина", "age" => 19, "email" => "katya@mail.com"],
    ["name" => "Юрій", "age" => 16, "email" => "yurii@mail.com"],
    ["name" => "Галина", "age" => 22, "email" => "halyna@mail.com"],
    ["name" => "Тарас", "age" => 30, "email" => "taras@mail.com"],
    ["name" => "Софія", "age" => 18, "email" => "sofiia@mail.com"],
    ["name" => "Володимир", "age" => 21, "email" => "volodymyr@mail.com"],
    ["name" => "Денис", "age" => 15, "email" => "denys@mail.com"]
];

#[OnlyAdults]
function filterAdults($users) {
    $ref = new ReflectionFunction(__FUNCTION__);
    $attrs = $ref->getAttributes();
    foreach ($attrs as $attr) {
        $attr->newInstance();
    }
    return array_filter($users, function($u) {
        return $u["age"] >= 18;
    });
}

function compareByNameLength($a, $b) {
    return strlen($a["name"]) <=> strlen($b["name"]);
}

$adults = filterAdults($users);

usort($adults, "compareByNameLength");

echo "<table border='1'>";
echo "<tr><th>Name</th><th>Age</th><th>Email</th></tr>";

foreach ($adults as $u) {
    echo "<tr>";
    echo "<td>{$u["name"]}</td>";
    echo "<td>{$u["age"]}</td>";
    echo "<td>{$u["email"]}</td>";
    echo "</tr>";
}

echo "</table>";
?>