import { INSPECT_MAX_BYTES } from 'buffer'
import * as aoc from '../aoc.js'

aoc.run(function(input) {
    const cups = input.content().split("").map(s => parseInt(s, 10))

    const min = Math.min(...cups)
    const max = Math.max(...cups)

    console.log(cups, min, max);

    let cupsLinkedList = {
        value: cups[0],
        next: null
    }

    let previousNode = cupsLinkedList
    for (let index = 1; index < cups.length; index++) {
        const newNode = { value: cups[index], next: null }
        previousNode.next = newNode
        previousNode = newNode
    }
    previousNode.next = cupsLinkedList

    function contains(value, linkedList) {
        let current = linkedList
        while(current != null) {
            if (current.value === value) {
                return true
            }
            current = current.next
        }
        return false
    }

    function getSearchedCup(currentCup, takenCups, min, max) {
        let value = currentCup.value
        do {
            value--
            if (value < min) {
                value = max
            }
        }
        while(contains(value, takenCups))

        return value
    }

    function display(linkedList) {
        const start = linkedList
        let node = linkedList
        let values = []
        while(node != null && node.next != start) {
            values.push(node.value);
            node = node.next
        }
        if (node) {
            values.push(node.value)
        }
        console.log(values.join(""));
    }

    let currentCup = cupsLinkedList
    for (let index = 0; index < 100; index++) {
        console.log(`=== ${index} ===`);
        console.log(`(${currentCup.value})`);
        const takenCups = currentCup.next
        currentCup.next = currentCup.next.next.next.next
        takenCups.next.next.next = null

        console.log("cups");
        display(currentCup)
        console.log(`taken cups: `);
        display(takenCups)

        const searchedCup = getSearchedCup(currentCup, takenCups, min, max)
        console.log(`searching ${searchedCup}` );
        let searchNode = currentCup
        while(searchNode.value != searchedCup) {
            searchNode = searchNode.next
        }

        takenCups.next.next.next = searchNode.next
        searchNode.next = takenCups

        display(currentCup)

        currentCup = currentCup.next

        console.log();
    }

    let searchNode = currentCup
    while(searchNode.value != 1) {
        searchNode = searchNode.next
    }

    let result = ""
    let node = searchNode.next
    do {
        result += node.value
        node = node.next
    } while(node != searchNode)
    display(searchNode.next)

    return result
})
