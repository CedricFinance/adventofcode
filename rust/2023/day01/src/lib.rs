pub fn compute_calibration_value(digits: Vec<u32>) -> u32 {
    let first = digits.first().expect("it must always have at least one digit"); 
    let last = digits.last().expect("it must always have at least one digit");
    10 * first + last
}
