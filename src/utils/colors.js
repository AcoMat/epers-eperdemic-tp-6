const styles = getComputedStyle(document.documentElement);

const colors = (name) => {
    console.log(styles.getPropertyValue(name))
    return styles.getPropertyValue(name)
}

export default colors