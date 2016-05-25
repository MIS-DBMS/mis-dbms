DROP TABLE IF EXISTS `HOLD`;

CREATE TABLE `HOLD` (
  `o_id` int(11) unsigned NOT NULL,
  KEY `o_id`(`o_id`),
  CONSTRAINT `IDX_01` FOREIGN KEY (`e_id`) REFERENCES `organization`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  `e_id` int(11) unsigned NOT NULL,
  KEY `e_id`(`e_id`),
  CONSTRAINT `IDX_02` FOREIGN KEY (`e_id`) REFERENCES `EVENT`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  `type` enum(主辦,協辦,贊助), unsigned NOT NULL,
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
