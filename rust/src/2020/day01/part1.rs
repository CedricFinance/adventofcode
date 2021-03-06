use std::fs::File;
use std::io::{self, BufRead, Error, ErrorKind};
use std::collections::HashSet;

fn main() {
    let filename = "../../../inputs/2020/day01/input.txt";

    let file = File::open(filename).expect("read input file");
    let numbers : HashSet<u32> = io::BufReader::new(file)
        .lines()
        .flat_map(|line|
            line.and_then(|v|
                v.parse::<u32>().map_err(|e| Error::new(ErrorKind::InvalidData, e))
            )
        )
        .collect();

    let result = numbers
        .iter()
        .find(|number| numbers.contains(&(2020 - *number)));

    match result {
        Some(number) => println!("first={} second={} result={}", number, 2020 - number, number * (2020 - number)),
        None => println!("Failed to find two numbers whose sum is 2020")
    }
}
