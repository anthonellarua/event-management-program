import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from './menu.module.scss';
import Image from 'next/image';

export default function Menu() {
  const router = useRouter();
  const isActiveLink = (pathname) => {
    return router.asPath === pathname || router.asPath.startsWith(`${pathname}/`);
  };

  return (
    <div className={styles.menusection}>
      <div className={styles.menusection__menucontainer}>
        <Link href="/eventos/create" className={styles.menusection__nuevoevento} passHref>
          <Image width={20} height={20} src="/icons/add-icon.png" alt=""/><span>Nuevo evento</span>
        </Link>
        <div className={styles.menusection__menu}>
          <span className={styles.menusection__subtitle}>Menu</span>
          <div className={styles.menusection__menudiv}>
            
              <Link href="/" className={isActiveLink('/') ? styles.menusection__activeLink : styles.menusection__link}>
                <Image width={20} height={20} src="/icons/home-icon-black.png" alt=""/>
                Home
              </Link>
            
              <Link href="/eventos" className={isActiveLink('/eventos') ? styles.menusection__activeLink : styles.menusection__link}>
                <Image width={20} height={20} src="/icons/calendar-icon-black.png" alt=""/>
                Eventos
              </Link>

              <Link href="/invitados" className={isActiveLink('/invitados') ? styles.menusection__activeLink : styles.menusection__link}>
                <Image width={20} height={20} src="/icons/people-icon-black.png" alt=""/>
                Invitados
              </Link>

              <Link href="/anfitriones" className={isActiveLink('/anfitriones') ? styles.menusection__activeLink : styles.menusection__link}>
                <Image width={20} height={20} src="/icons/anfitriones-icon-black.png" alt=""/>
                Anfitriones
              </Link>

              <Link href="/programas" className={isActiveLink('/programas') ? styles.menusection__activeLink : styles.menusection__link}>
                <Image width={20} height={20} src="/icons/timer-icon-black.png" alt=""/>
                Programas
              </Link>

              <Link href="/lugares" className={isActiveLink('/lugares') ? styles.menusection__activeLink : styles.menusection__link}>
                <Image width={20} height={20} src="/icons/pin-icon-black.png" alt=""/>
                Lugares
              </Link>

              <Link href="/organizadores" className={isActiveLink('/organizadores') ? styles.menusection__activeLink : styles.menusection__link}>
                <Image width={20} height={20} src="/icons/user-square-icon-black.png" alt=""/>
                Organizadores
              </Link>
          </div>
        </div>
        
      </div>
    </div>
  );
}
