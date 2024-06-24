const styles = getComputedStyle(document.documentElement);

const colors = (name) => {
    return styles.getPropertyValue(name)
}

export default colors