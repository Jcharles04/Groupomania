import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({

    /* -------------------------------------------------------------------------- */
    /*                               LOGIN / SIGNIN                               */
    /* -------------------------------------------------------------------------- */

    bg: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },

    /* -------------------------------------------------------------------------- */
    /*                               DashBoard Style                              */
    /* -------------------------------------------------------------------------- */

    main: {
        background: 'rgba(245, 245, 245, 1)',
    },


    /* -------------------------------------------------------------------------- */
    /*                                Header Style                                */
    /* -------------------------------------------------------------------------- */

    grow: {
        flexGrow: 1,
        margin: '0 0 5px 0',
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'flex',
    },
    hello: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
        display: 'block',
        },
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',  
    },
    sectionDesktop: {
        display: 'flex',
    },

    /* -------------------------------------------------------------------------- */
    /*                               PostCard Style                               */
    /* -------------------------------------------------------------------------- */

    root: {
        maxWidth: 900,
        minWidth: 'auto',
        margin:'0 auto 25px auto'
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    image: {
        width: 200,
        height: 150,
    },
    img: {
        margin: 'auto',
        maxWidth: '100%',
        maxHeight: '100%',
    },
    post: {
        height: 'auto',
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        
        transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
        }),
    },

    /* -------------------------------------------------------------------------- */
    /*                                 Card Styles                                */
    /* -------------------------------------------------------------------------- */

    MainCard: {
        borderBottom: '1px solid rgb(225, 225, 225)',
    },

    /* -------------------------------------------------------------------------- */
    /*                              CardHeader Style                              */
    /* -------------------------------------------------------------------------- */

    serv: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
        display: 'block',
        },
    },


    /* -------------------------------------------------------------------------- */
    /*                              CardFooter Style                              */
    /* -------------------------------------------------------------------------- */

    right: {
        marginLeft: 'auto',  
    },

    /* -------------------------------------------------------------------------- */
    /*                               CardReply Style                              */
    /* -------------------------------------------------------------------------- */

    reply: {
        margin: '0 20px 40px 0',
    },

    /* -------------------------------------------------------------------------- */
    /*                                 Admin Style                                */
    /* -------------------------------------------------------------------------- */

    table: {
        minWidth: 650,
    },

}));

export { useStyles };