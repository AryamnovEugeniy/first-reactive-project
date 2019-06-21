

const style = theme => ({
    header: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        ...theme.typography.h6,
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        color: theme.palette.primary.contrastText,
    },
    text: {
        ...theme.typography.body2,
        marginBottom: theme.spacing.unit * 2,
    },
    icon: {
        fontSize: '18px',
        paddingRight: theme.spacing.unit,
    },
});

export default style;