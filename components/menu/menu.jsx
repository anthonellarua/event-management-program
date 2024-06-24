import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from './menu.module.scss';

export default function Menu() {
  const router = useRouter();
  const isActiveLink = (pathname) => {
    return router.asPath === pathname || router.asPath.startsWith(`${pathname}/`);
  };

  return (
    <div className={styles.menusection}>
      <div className={styles.menusection__menucontainer}>
        <span>Nuevo evento</span>
        <div>
          <span>Menu</span>
          <div className={styles.menusection__menudiv}>
            <Link href="/eventos" passHref>
              <span className={isActiveLink('/eventos') ? styles.menusection__activeLink : styles.menusection__link}>Eventos</span>
            </Link>
            <Link href="/invitados" passHref>
              <span className={isActiveLink('/invitados') ? styles.menusection__activeLink : styles.menusection__link}>Invitados</span>
            </Link>
            <Link href="/anfitriones" passHref>
              <span className={isActiveLink('/anfitriones') ? styles.menusection__activeLink : styles.menusection__link}>Anfitriones</span>
            </Link>
            <Link href="/programas" passHref>
              <span className={isActiveLink('/programas') ? styles.menusection__activeLink : styles.menusection__link}>Programas</span>
            </Link>
            <Link href="/organizadores" passHref>
              <span className={isActiveLink('/organizadores') ? styles.menusection__activeLink : styles.menusection__link}>Organizadores</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
