---
toc: true
comments: false
layout: post
title: JavaScript Basics
description: The Basic commands that we are learning about javascript. 
type: hacks
courses: { compsci: {week: 1} }
---

## Summary:
During this week we learned how to assign and create javascript basics. This varied from assigning variabls to many other javascript commands. 
# Variables
A Variable is defined as an abstraction inside of a program that can hold a value.

Variables can be named from letters like X, Y, Z to phrases like APIKEY. The point of these names is to store some sort of Data to a resuable value.

var x = 10;
var name = "Gerald";
var fav_food = "Cookies";
Variable Naming
This brings us to the topic of naming Variables. The names of variables are really important when working in groups. For example when one of your teammates review your code they use the names of your variables to quickly understand your code. In the code above you can understand that the variable fav_food represents a favorite food

There are 3 Important Coding Practices to follow when it comes to naming variables

# SnakeCase
SnakeCase is where you replace spaces in variable names with a underscore

    var variable_one = "Aashray";
Here’s an example of a SnakeCase variable that uses a _ as a space.

Now try making your own SnakeCase variable and set the variable equal to a integer.

# PascalCase
PascalCase is where you capitialize every word in your variable, but keep it all as one singluar phrase with no spaces

    var VariableOne = "Chrissie";
Here you can clearly see that the vairable has two diffrent words, and we didn’t need to use a space to seperate it.

Try making your own PascalCase variable

# CamelCase
CamelCase is where you captalize the second word in the variable

    var variableOne = "Arushi";
Here the One is captalized to indicate a second word in the variable without using a space.

Try making your own CamelCase

## Variable Types
Earlier we explained how to assign variables and properly name them. However in the code above even though I followed all these steps and properly named them I ran into a error. This is because the types of data, string and int cannot be added. But what are integers and strings?

In python there are multiple types of data that a variable can be, for now lets look at the most commonly use ones.

# Integers
Integers are a numerical value going from 1,2,3,4 or -1,2,-3 etc. These are numbers with no decimals and are ussualy called ints

    var x = 3;

    console.log(x);
In this case we call int x to be 3. Normally you don’t need to say the data type before the variable in python, however in other languages like JS or C++ you would need to.

# Strings
Strings are a chain of text, numbers or charcters that are all inside of “ “

    var Cookies = " My Fav cookies are Choclate Chip ";
Here we set a string cookie to be representing the statement that “ My Fav Cookies are Choclate Chip” The “ “ marks are what determine it is a string in most coding languages.

# Boolean
Booleans are True or False, and they are used for condtional statements

    var ChrissieGetsSleep = false;
    
    if (ChrissieGetsSleep === true){
        continue;
    }
    else{
        return 0;
    }
Here we have a if statement that checks if the boolean variable is currently true and if its true it won’t do anything, but if its false it will return 0.

# Float
Floats are a integers that can have decimal values

    var x = 3.1415;
    console.log(x);
In this case we call int x to be 3.1415, and this is a float because of its decimal points.

# Arrays
Arrays are ordered collections of items in javascript. They can contain a mix of different data types, including integers, floats, strings, and more.

var my_array = [1, 2, 3, 4, 5];
console.log(my_array);
Objects in javascript
Objects are versatile data structures in javascript that store key-value pairs. Each value in an object is associated with a unique key, which allows for efficient lookups and retrieval of values.

var my_obj = {
    "name": "Alice",
    "age": 30,
    "city": "Wonderland"
}
console.log(my_obj);