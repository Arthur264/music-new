export * from './tag.interface';
export * from './user.interface';
export * from './song.interface';
export * from './artist.interface';
export * from './alert.interface';
export * from './menu-item.interface';
export * from './filter.interface';
export * from './playlist.interface';
export * from './social-link.interface';

export function instanseofInterface(instance, interfaceName) {
    return instance.type === interfaceName.toLowerCase();
}
